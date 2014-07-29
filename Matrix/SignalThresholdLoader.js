﻿var SignalThreshold = require('../Entity/Matrix/SignalThreshold');
var List = require('../Entity/List');
var SectionEnum = require('../Entity/Section/SectionEnum');

var SignalThresholdLoader = (function () {
    function SignalThresholdLoader() {
        this.thresholds = new List([
            new SignalThreshold(2 /* MP1 */, 'Počet a tržby prodejů produktů', 0.03, 0.05, 0.05, 0.11, 1, 2, 3, 4, null, null, null, null),
            new SignalThreshold(3 /* MP2 */, 'Produktová marže', 0.03, 0.05, 0.05, 0.11, 1, 2, 3, 4, 'Má vysokou marži a prodává se hodně', 'Má vysokou marži a prodává se málo', 'Má nízkou marži a prodává se hodně', 'Má nízkou marži a prodává se málo'),
            new SignalThreshold(4 /* MP3 */, 'Cenová elasticita', 7, 7, 0.03, 0.11, 2, 3, 1, 4, 'Elastická a hodně se prodává', 'Elastická a málo se prodává', 'Neelastická a hodně se prodává', 'Neelastická a málo se prodává'),
            new SignalThreshold(5 /* MP4 */, 'Produktový životní cyklus', 0.03, 0.05, 0.05, 0.11, 1, 2, 3, 4, null, null, null, null),
            new SignalThreshold(6 /* MP5 */, 'Objem prodeje produktu / kategoriálně', 0.03, 7, 7, 0.11, 1, 3, 2, 4, 'Dobrý produkt a dobrá kategorie', 'Blbý produkt v dobré kategorii', 'Super produkt v blbý kategorii', 'Standardní produkt a kategorie'),
            new SignalThreshold(7 /* MP6 */, 'Produkt je promovaný', 0.05, 7, 0.03, 0.11, 2, 3, 1, 4, 'Je promovaný a má vysokou cenu', 'Není promovaný a má vysokou cenu', 'Je promovaný a má nízkou cenu', 'Není promovaný a má nízkou cenu'),
            new SignalThreshold(8 /* MP7 */, 'Produktové skladové zásoby', 0.05, 0.03, 0.05, 0.11, 3, 1, 2, 4, 'Produktu je hodně skladem a má vysokou hodnotu', 'Produktu je málo skladem a má vysokou hodnotu', 'Produktu je hodně skladem ale má nízkou hodnotu', 'Produktu je málo skladem ale má nízkou hodnotu'),
            new SignalThreshold(9 /* MP8 */, 'Ceny proti konkurenci', null, 0.05, 0.05, 0.03, 4, 3, 2, 1, null, 'Naše cena je o hodně nižší než konkurence', 'Naše cena je o hodně vyšší než konkurence', 'Naše cena není od konkurence tak odlišná'),
            new SignalThreshold(10 /* MP9 */, 'Produkt je v sezoně', 0.03, 0.05, 0.05, 0.11, 1, 2, 3, 4, null, null, null, null),
            new SignalThreshold(11 /* MP10 */, 'Produkt má slevu', 0.05, 7, 0.03, 0.11, 2, 3, 1, 4, 'Produkt má slevu a vysokou cenu', 'Produkt nemá slevu a má vysokou cenu', 'Produkt má slevu a má nízkou cenu', 'Produkt nemá slevu a má nízkou cenu'),
            new SignalThreshold(13 /* MC1 */, 'Loyality / Důležitost - struktura zákazníků dle nákupů a slev', 7, 0.11, 0.03, 7, 2, 4, 1, 3, 'kvadrant hodně nákupů s velkou slevou', 'Málo nákupů s velkou slevou', 'Hodně nákupů a malé slevy', 'Málo nákupů a malé slevy'),
            new SignalThreshold(14 /* MC2 */, 'Tržby na zákazníka', 0.03, 7, 7, 0.11, 1, 2, 3, 4, 'Utratí hodně a chodí často', 'Utratí hodně a chodí málo', 'Utratí málo a chodí často', 'Utratí málo a chodí málo'),
            new SignalThreshold(15 /* MC3 */, 'Průměrná tržba na objednávku', 0.03, 7, 7, 0.11, 1, 2, 3, 4, 'Velká tržba a spoustu objednávek', 'Malá tržba a hodně nákupů', 'Velká tržba a málo nákupů (max 2)', 'Malá tržba a max 2 nákupy'),
            new SignalThreshold(18 /* MM2 */, 'Marketingové kanály', 0.03, 7, 7, 0.11, 1, 2, 3, 4, 'Hodně přišlo a hodně nakoupilo', 'Málo přišlo ale hodně nakoupilo', 'Hodně přišlo a málo nakoupilo', 'Málo přišlo a nenakoupilo'),
            new SignalThreshold(19 /* MM3 */, 'Cena konverze', 0.03, 0.05, 0.05, 0.11, 1, 2, 3, 4, null, null, null, null)
        ], function (e) {
            return e;
        });
    }
    SignalThresholdLoader.prototype.getByMatrixType = function (section) {
        return this.thresholds.find(function (threshold) {
            return threshold.Section === section;
        });
    };
    return SignalThresholdLoader;
})();
module.exports = SignalThresholdLoader;
