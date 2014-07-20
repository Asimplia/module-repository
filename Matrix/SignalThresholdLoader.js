﻿var SignalThreshold = require('../Entity/Matrix/SignalThreshold');
var List = require('../Entity/List');

var SignalThresholdLoader = (function () {
    function SignalThresholdLoader() {
        this.thresholds = new List([
            new SignalThreshold('MP1', 'Počet a tržby prodejů produktů', 3, 5, 5, 11, 1, 2, 3, 4, null, null, null, null),
            new SignalThreshold('MP2', 'Produktová marže', 3, 5, 5, 11, 1, 2, 3, 4, 'Má vysokou marži a prodává se hodně', 'Má vysokou marži a prodává se málo', 'Má nízkou marži a prodává se hodně', 'Má nízkou marži a prodává se málo'),
            new SignalThreshold('MP3', 'Cenová elasticita', 7, 7, 3, 11, 2, 3, 1, 4, 'Elastická a hodně se prodává', 'Elastická a málo se prodává', 'Neelastická a hodně se prodává', 'Neelastická a málo se prodává'),
            new SignalThreshold('MP4', 'Produktový životní cyklus', 3, 5, 5, 11, 1, 2, 3, 4, null, null, null, null),
            new SignalThreshold('MP5', 'Objem prodeje produktu / kategoriálně', 3, 7, 7, 11, 1, 3, 2, 4, 'Dobrý produkt a dobrá kategorie', 'Blbý produkt v dobré kategorii', 'Super produkt v blbý kategorii', 'Standardní produkt a kategorie'),
            new SignalThreshold('MP6', 'Produkt je promovaný', 5, 7, 3, 11, 2, 3, 1, 4, 'Je promovaný a má vysokou cenu', 'Není promovaný a má vysokou cenu', 'Je promovaný a má nízkou cenu', 'Není promovaný a má nízkou cenu'),
            new SignalThreshold('MP7', 'Produktové skladové zásoby', 5, 3, 5, 11, 3, 1, 2, 4, 'Produktu je hodně skladem a má vysokou hodnotu', 'Produktu je málo skladem a má vysokou hodnotu', 'Produktu je hodně skladem ale má nízkou hodnotu', 'Produktu je málo skladem ale má nízkou hodnotu'),
            new SignalThreshold('MP8', 'Ceny proti konkurenci', null, 5, 5, 3, 4, 3, 2, 1, null, 'Naše cena je o hodně nižší než konkurence', 'Naše cena je o hodně vyšší než konkurence', 'Naše cena není od konkurence tak odlišná'),
            new SignalThreshold('MP9', 'Produkt je v sezoně', 3, 5, 5, 11, 1, 2, 3, 4, null, null, null, null),
            new SignalThreshold('MP10', 'Produkt má slevu', 5, 7, 3, 11, 2, 3, 1, 4, 'Produkt má slevu a vysokou cenu', 'Produkt nemá slevu a má vysokou cenu', 'Produkt má slevu a má nízkou cenu', 'Produkt nemá slevu a má nízkou cenu'),
            new SignalThreshold('MC1', 'Loyality / Důležitost - struktura zákazníků dle nákupů a slev', 7, 11, 3, 7, 2, 4, 1, 3, 'kvadrant hodně nákupů s velkou slevou', 'Málo nákupů s velkou slevou', 'Hodně nákupů a malé slevy', 'Málo nákupů a malé slevy'),
            new SignalThreshold('MC2', 'Tržby na zákazníka', 3, 7, 7, 11, 1, 2, 3, 4, 'Utratí hodně a chodí často', 'Utratí hodně a chodí málo', 'Utratí málo a chodí často', 'Utratí málo a chodí málo'),
            new SignalThreshold('MC3', 'Průměrná tržba na objednávku', 3, 7, 7, 11, 1, 2, 3, 4, 'Velká tržba a spoustu objednávek', 'Malá tržba a hodně nákupů', 'Velká tržba a málo nákupů (max 2)', 'Malá tržba a max 2 nákupy'),
            new SignalThreshold('MM2', 'Marketingové kanály', 3, 7, 7, 11, 1, 2, 3, 4, 'Hodně přišlo a hodně nakoupilo', 'Málo přišlo ale hodně nakoupilo', 'Hodně přišlo a málo nakoupilo', 'Málo přišlo a nenakoupilo'),
            new SignalThreshold('MM3', 'Cena konverze', 3, 5, 5, 11, 1, 2, 3, 4, null, null, null, null)
        ], function (e) {
            return e;
        });
    }
    SignalThresholdLoader.prototype.getByMatrixType = function (type) {
        return this.thresholds.find(function (threshold) {
            return threshold.Type === type;
        });
    };
    return SignalThresholdLoader;
})();
module.exports = SignalThresholdLoader;
