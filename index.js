const natural = require('natural');
const express = require('express');

const app = express();
const classifier = new natural.BayesClassifier();

classifier.addDocument('Tous les humains sont égaux', 'non raciste');
classifier.addDocument('"La couleur de peau ne définit pas une personne.', 'non raciste');
classifier.addDocument("Chacun devrait être traité avec respect, peu importe sa couleur de peau.", 'non raciste');
classifier.addDocument("La diversité enrichit nos communautés.", 'non raciste');
classifier.addDocument("Les stéréotypes raciaux sont basés sur des préjugés.", 'non raciste');
classifier.addDocument("Les gens de toutes les couleurs peuvent être amis.", 'non raciste');
classifier.addDocument("Les gens de toutes les couleurs peuvent être amoureux.", 'non raciste');
classifier.addDocument("Les gens de toutes les couleurs peuvent travailler ensemble.", 'non raciste');
classifier.addDocument("Les gens de toutes les couleurs peuvent vivre ensemble.", 'non raciste');
classifier.addDocument("Les gens de toutes les couleurs peuvent réussir ensemble.", 'non raciste');
classifier.addDocument("Les gens de toutes les couleurs peuvent s'entraider.", 'non raciste');

classifier.addDocument('Je ne te vois pas comme ça.', 'raciste');
classifier.addDocument("Les gens de cette ethnie sont tous des criminels.", 'raciste');
classifier.addDocument("Je ne veux pas être associé à des gens de ta couleur.", 'raciste');
classifier.addDocument("Les immigrants prennent nos emplois.", 'raciste');
classifier.addDocument("Les gens de ta couleur sont moins intelligents.", 'raciste');
classifier.addDocument("Les gens de ta couleur sont dangereux.", 'raciste');
classifier.addDocument("Les noirs sont dangereux.", 'raciste');
classifier.addDocument("Les arabes sont des terroristes.", 'raciste');
classifier.addDocument("Les juifs sont avares.", 'raciste');
classifier.addDocument("Les asiatiques sont des travailleurs acharnés.", 'raciste');
classifier.addDocument("Les blancs sont racistes.", 'raciste');
classifier.addDocument("Les noirs sont des criminels.", 'raciste');
classifier.addDocument("Les arabes sont des voleurs.", 'raciste');
classifier.addDocument("Les juifs sont manipulateurs.", 'raciste');
classifier.addDocument("Les asiatiques sont des génies.", 'raciste');


classifier.train();

app.get('/getSentiment/:text', (req, res) => {
    const text = req.params.text;
    const classification = classifier.classify(text);

    let rep = {
        text: text,
        classification: classification
    }

    res.send(rep);
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});