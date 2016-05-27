$('#myform').submit(function () {
    return false;
});

$('#insert').click(function () {
       var bateauxJson = {};

    var boolean_vitesse = false;
    var current2;
    for (var j = 0; j < bateaux.length; j++) {
        var editCurrentLine2 = [];
        if (bateaux[j] != "") {
            currentPolyline2 = {};
            editIcon = bateaux[j].editIcon;
            editVitesse = bateaux[j].editVitesse;
            editColor = bateaux[j].editColor;
            editRadar = bateaux[j].editRadar;
            suppression = bateaux[j].suppression;
            editType = bateaux[j].editType;
            editTypeVitesse = bateaux[j].editTypeVitesse;
            editDescription = bateaux[j].editDescription;
            editSpeed = bateaux[j].editSpeed;
            editDetection = bateaux[j].editDetection;
            if (bateaux[j]._latlngs && bateaux[j]._latlngs != null && bateaux[j]._latlngs[1]) {
                if (bateaux[j]._currentLine[1] != null) {
                    editCurrentPoint = bateaux[j]._currentLine[1]; //recup position
                    editCurrentLine = bateaux[j]._latlngs;
                    console.log(editCurrentLine2);
                    editCurrentLine2[0] = bateaux[j]._latlng;
                    current2 = 1;
                    for (var i = 0; i <= editCurrentLine.length - 1; i++) { //recup trajet à partir du point

                        if (editCurrentLine[i] == editCurrentPoint) {
                            boolean_vitesse = true;
                        }
                        if (boolean_vitesse == true) { //if pour reprendre le trajet à partir des points ou l'on en est
                            editCurrentLine2[current2] = editCurrentLine[i];
                            current2++;
                        }
                        /*bateaux[i]._latlngs*/
                    };
                } else {
                    editCurrentLine2 = bateaux[j]._latlngs; //recup trajet
                }



            } else {
                editCurrentLine2[0] = bateaux[j]._latlng;
                console.log('edit :' + editCurrentLine2);

            }

            bateauxJson[j] = [editIcon, editVitesse, editColor, suppression, editTypeVitesse, editType, editSpeed, editRadar, editDetection, editCurrentLine2];
        }
        console.log(bateauxJson[j]);
    }
    var bateauxJsonString = [];
    bateauxJsonString = JSON.stringify(bateauxJson);
    $('#bateau_save').val(bateauxJsonString);
    console.log($('#bateau_save').val());
    $.post(
        $('#myform').attr('action')
        , $('#myform :input').serializeArray()
        , function (result) {
            $('#result').html(result);
        }
    );
});