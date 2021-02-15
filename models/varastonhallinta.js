const mysql = require("mysql");
const crypto = require("crypto");
var fs = require('fs');

const yhteys = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tuotetietokanta"
});

yhteys.connect((err) => {
    if (!err) {
        console.log("Tietokantayhteys avattu");
    } else {
        throw `Virhe yhdistettäessä tietokantaan: ${err}`;
    }
});



module.exports = {

    "etsiKayttaja": (kayttajatunnus, callback) => {


        let kysely = `SELECT * FROM kayttajat WHERE kayttajatunnus = ?`;

        yhteys.query(kysely, [kayttajatunnus], (err, data) => {

            if (!err && data != null) {
                callback(data);
            } else {
                callback(err);
            }
        });
    },

    "haeTuotteet": (callback) => {

        let kysely = `SELECT * FROM tuotteet`;

        yhteys.query(kysely, (err, data) => {

            if (!err && data != null) {
                callback(data);
            } else {
                callback(err);
            }
        });
    },


    "haeTuote": (id) => {

        return new Promise((resolve, reject) => {

            let kysely = `SELECT * FROM tuotteet WHERE id = ?`;

            yhteys.query(kysely, [id], (err, data) => {


                if (!err && data != null) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },


    "haeSuosikit": (kayttajanId, callback) => {

        let kysely = `SELECT tuotteet.id, tuotteet.nimi, tuotteet.hinta, tuotteet.kuvaus, tuotteet.varastosaldo, tuotteet.tuotekuva
                     FROM tuotteet INNER JOIN suosikit 
                     ON tuotteet.id = suosikit.tuoteId
                     WHERE kayttajaId = ?`;

        yhteys.query(kysely, [kayttajanId], (err, data) => {

            if (!err && data != null) {
                callback(data);
            } else {
                callback(err);
            }
        });
    },

    "tallennaTuote": (tiedot, tiedostonimi, callback) => {

        let err = "";

        tiedot.varastosaldo = Number.parseInt(tiedot.varastosaldo)

        // Tarkistetaan lomakkeen syötteitä
        if (tiedot.tuotteenNimi.length == 0) {
            err += "Anna tuotteelle nimi! "
        }
        if (!Number(tiedot.tuotteenHinta)) {
            err += "Ilmoita hinta numeroina. Käytä erottimena pistettä (.)! "
        }
        if (!Number(tiedot.varastosaldo)) {
            err += "Ilmoita varastosaldo numeroina! "
        }

        if (err.length != 0) {
            callback(err);
        } else {

            let kysely = `INSERT INTO tuotteet (nimi, hinta, kuvaus, varastosaldo, tuotekuva) VALUES (?,?,?,?,?)`;

            yhteys.query(kysely, [tiedot.tuotteenNimi, tiedot.tuotteenHinta, tiedot.tuotekuvaus, tiedot.varastosaldo, tiedostonimi], (err) => {

                if (err == null) {
                    callback();
                } else {
                    callback(err);
                }
            });
        }
    },

    "poistaTuote": (id, callback) => {

        let kysely = `DELETE FROM tuotteet WHERE id = ?`;
        let kuvanTiedot = `SELECT tuotekuva FROM tuotteet WHERE id = ?`;

        yhteys.query(kuvanTiedot, [id], (err, data) => {

            if (err == null) {

                fs.unlink("./public/uploads/" + data[0].tuotekuva, (err) => {

                    yhteys.query(kysely, [id], (err) => {

                        if (err == null) {
                            callback();
                        } else {
                            callback(err);
                        }
                    });
                });
            } else {
                callback(err);
            }
        });
    },


    "poistaSuosikki": (tuoteId, kayttajanId, callback) => {


        let kysely = `DELETE FROM suosikit WHERE tuoteId = ? AND kayttajaId = ?`;

        yhteys.query(kysely, [tuoteId, kayttajanId], (err) => {

            if (err == null) {
                callback();
            } else {
                callback(err);
            }
        });
    },


    "tallennaMuokattuTuote": (tiedot, callback) => {

        let tuotekuva = "";

        if (tiedot.file !== undefined) {
            tuotekuva = tiedot.file.filename;
        } else {
            tuotekuva = tiedot.body.tuotekuva;
        }


        let kysely = `UPDATE tuotteet SET nimi = ?, hinta = ?, kuvaus = ?, varastosaldo = ?, tuotekuva =? WHERE id = ?`;

        yhteys.query(kysely, [tiedot.body.tuotteenNimi, tiedot.body.tuotteenHinta, tiedot.body.tuotekuvaus, tiedot.body.varastosaldo, tuotekuva, tiedot.body.tuotteenId], (err) => {

            if (err == null) {
                callback();
            } else {
                callback(err);
            }
        });
    },


    "tallennaKayttaja": (tiedot, callback) => {

        let err = "";

        if (tiedot.kayttajatunnus.length == 0) {
            err += "Anna käyttäjätunnus! "
        }
        if (tiedot.salasana.length == 0) {
            err += "Anna salasana! "
        }

        if (err.length != 0) {
            callback(err);

        } else {

            let kysely = `INSERT INTO kayttajat (kayttajatunnus, salasana, kayttooikeus) VALUES (?,?,?)`;


            let hash = crypto.createHash("SHA512").update(tiedot.salasana).digest("hex");

            yhteys.query(kysely, [tiedot.kayttajatunnus, hash, tiedot.kayttooikeudet], (err) => {

                if (err == null) {
                    callback();
                } else {
                    callback(err);
                }
            });
        }
    },

    "lisaaSuosikki": (req, kayttajanId, callback) => {

        let tarkastus = `SELECT * FROM suosikit WHERE tuoteId = ? AND kayttajaID = ?`;

        yhteys.query(tarkastus, [req.valittu, kayttajanId], (err, data) => {

            if (data.length == 0) {
                let kysely = `INSERT INTO suosikit (kayttajaId, tuoteId) VALUES (?,?)`;

                yhteys.query(kysely, [kayttajanId, req.valittu], (err) => {

                    if (err == null) {
                        callback();
                    } else {
                        callback(err);
                    }
                });
            } else {
                callback(err = "Olet jo lisännyt tuotteen!")
            }
        });
    }

}