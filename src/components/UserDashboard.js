import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { jsPDF } from "jspdf";

const UserDashboard = () => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [organizationSatisfaction, setOrganizationSatisfaction] = useState('');
  const [techniquesSatisfaction, setTechniquesSatisfaction] = useState('');
  const [documentsSatisfaction, setDocumentsSatisfaction] = useState('');
  const [overallSatisfaction, setOverallSatisfaction] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [instructorSatisfaction, setInstructorSatisfaction] = useState('');
  const [finalNote, setFinalNote] = useState('');
  const [learningImpact, setLearningImpact] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [positiveFeedback, setPositiveFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle feedback submission
  const handleFeedbackSubmit = async () => {
    if (!userName || !userPhone || !organizationSatisfaction || !techniquesSatisfaction || !documentsSatisfaction || !overallSatisfaction || !recommendation || !instructorSatisfaction || !learningImpact || !suggestions || !positiveFeedback) {
      setError("Veuillez compléter tous les champs.");
      return;
    }

    setLoading(true);
    try {
      // Save feedback to Firestore
      const feedbackRef = collection(db, 'feedback');
      await addDoc(feedbackRef, {
        userName,
        userPhone,
        organizationSatisfaction,
        techniquesSatisfaction,
        documentsSatisfaction,
        overallSatisfaction,
        recommendation,
        instructorSatisfaction,
        finalNote,
        learningImpact,
        suggestions,
        positiveFeedback,
        timestamp: new Date(),
      });

      // Reset form after successful submission
      setUserName('');
      setUserPhone('');
      setOrganizationSatisfaction('');
      setTechniquesSatisfaction('');
      setDocumentsSatisfaction('');
      setOverallSatisfaction('');
      setRecommendation('');
      setInstructorSatisfaction('');
      setFinalNote('');
      setLearningImpact('');
      setSuggestions('');
      setPositiveFeedback('');
      setError('');
      alert("Feedback soumis avec succès!");
    } catch (err) {
      setError("Échec de la soumission du feedback. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate PDF from the feedback
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text("Feedback sur l'atelier", 20, 20);
    doc.text(`Nom: ${userName}`, 20, 30);
    doc.text(`Numéro de téléphone: ${userPhone}`, 20, 40);
    doc.text(`Satisfaction sur l'organisation: ${organizationSatisfaction}`, 20, 50);
    doc.text(`Satisfaction sur les techniques: ${techniquesSatisfaction}`, 20, 60);
    doc.text(`Satisfaction sur les documents: ${documentsSatisfaction}`, 20, 70);
    doc.text(`Satisfaction globale: ${overallSatisfaction}`, 20, 80);
    doc.text(`Recommandation: ${recommendation}`, 20, 90);
    doc.text(`Satisfaction sur les intervenants: ${instructorSatisfaction}`, 20, 100);
    doc.text(`Impact sur l'apprentissage: ${learningImpact}`, 20, 110);
    doc.text(`Suggestions: ${suggestions}`, 20, 120);
    doc.text(`Retours positifs: ${positiveFeedback}`, 20, 130);
    doc.text(`Note finale: ${finalNote}`, 20, 140);
    doc.save("feedback_atelier.pdf");
  };

  return (
    <Box sx={{ 
      maxWidth: 600, 
      margin: 'auto', 
      padding: 4, 
      boxShadow: 4, 
      borderRadius: 2, 
      backgroundColor: '#f4f4f9', 
      fontFamily: 'Roboto, sans-serif', 
      mt: 4 
    }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
        Soumettre votre feedback
      </Typography>

      {/* Error message */}
      {error && <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2 }}>{error}</Typography>}

      {/* Name and Phone fields */}
      <TextField
        label="Nom"
        variant="outlined"
        fullWidth
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        sx={{
          marginBottom: 3, 
          backgroundColor: 'white', 
          borderRadius: 1, 
        }}
      />

      <TextField
        label="Numéro de téléphone"
        variant="outlined"
        fullWidth
        value={userPhone}
        onChange={(e) => setUserPhone(e.target.value)}
        sx={{
          marginBottom: 3, 
          backgroundColor: 'white', 
          borderRadius: 1, 
        }}
      />

      {/* Satisfaction Fields */}
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography sx={{ fontWeight: 'medium', marginBottom: 1 }}>Satisfaction sur l'organisation</Typography>
        <RadioGroup
          value={organizationSatisfaction}
          onChange={(e) => setOrganizationSatisfaction(e.target.value)}
          row
        >
          <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
          <FormControlLabel value="Good" control={<Radio />} label="Bien" />
          <FormControlLabel value="Fair" control={<Radio />} label="Moyenne" />
          <FormControlLabel value="Poor" control={<Radio />} label="Mauvais" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography sx={{ fontWeight: 'medium', marginBottom: 1 }}>Satisfaction sur les techniques</Typography>
        <RadioGroup
          value={techniquesSatisfaction}
          onChange={(e) => setTechniquesSatisfaction(e.target.value)}
          row
        >
          <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
          <FormControlLabel value="Good" control={<Radio />} label="Bien" />
          <FormControlLabel value="Fair" control={<Radio />} label="Moyenne" />
          <FormControlLabel value="Poor" control={<Radio />} label="Mauvais" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography sx={{ fontWeight: 'medium', marginBottom: 1 }}>Satisfaction sur les documents</Typography>
        <RadioGroup
          value={documentsSatisfaction}
          onChange={(e) => setDocumentsSatisfaction(e.target.value)}
          row
        >
          <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
          <FormControlLabel value="Good" control={<Radio />} label="Bien" />
          <FormControlLabel value="Fair" control={<Radio />} label="Moyenne" />
          <FormControlLabel value="Poor" control={<Radio />} label="Mauvais" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography sx={{ fontWeight: 'medium', marginBottom: 1 }}>Satisfaction globale</Typography>
        <RadioGroup
          value={overallSatisfaction}
          onChange={(e) => setOverallSatisfaction(e.target.value)}
          row
        >
          <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
          <FormControlLabel value="Good" control={<Radio />} label="Bien" />
          <FormControlLabel value="Fair" control={<Radio />} label="Moyenne" />
          <FormControlLabel value="Poor" control={<Radio />} label="Mauvais" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography sx={{ fontWeight: 'medium', marginBottom: 1 }}>Recommanderiez-vous cet atelier à d'autres personnes ?</Typography>
        <RadioGroup
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
          row
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Oui" />
          <FormControlLabel value="No" control={<Radio />} label="Non" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography sx={{ fontWeight: 'medium', marginBottom: 1 }}>Satisfaction sur les intervenants</Typography>
        <RadioGroup
          value={instructorSatisfaction}
          onChange={(e) => setInstructorSatisfaction(e.target.value)}
          row
        >
          <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
          <FormControlLabel value="Good" control={<Radio />} label="Bien" />
          <FormControlLabel value="Fair" control={<Radio />} label="Moyenne" />
          <FormControlLabel value="Poor" control={<Radio />} label="Mauvais" />
        </RadioGroup>
      </FormControl>

      {/* Open-ended fields */}
      <TextField
        label="Impact sur l'apprentissage"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={learningImpact}
        onChange={(e) => setLearningImpact(e.target.value)}
        sx={{ marginBottom: 3, backgroundColor: 'white', borderRadius: 1 }}
      />

      <TextField
        label="Suggestions d'amélioration"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={suggestions}
        onChange={(e) => setSuggestions(e.target.value)}
        sx={{ marginBottom: 3, backgroundColor: 'white', borderRadius: 1 }}
      />

      <TextField
        label="Retours positifs"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={positiveFeedback}
        onChange={(e) => setPositiveFeedback(e.target.value)}
        sx={{ marginBottom: 3, backgroundColor: 'white', borderRadius: 1 }}
      />

      {/* Final Note */}
      <TextField
        label="Note finale"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={finalNote}
        onChange={(e) => setFinalNote(e.target.value)}
        sx={{ marginBottom: 3, backgroundColor: 'white', borderRadius: 1 }}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleFeedbackSubmit}
        disabled={loading}
        sx={{
          padding: 1.5,
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          }
        }}
      >
        {loading ? 'Soumission en cours...' : 'Soumettre le Feedback'}
      </Button>

      {/* PDF Generation Button */}
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleGeneratePDF}
        sx={{
          marginTop: 2,
          padding: 1.5,
          fontSize: '16px',
          fontWeight: 'bold',
          borderColor: '#1976d2',
          color: '#1976d2',
          '&:hover': {
            borderColor: '#1565c0',
            color: '#1565c0'
          }
        }}
      >
        Générer le PDF
      </Button>
    </Box>
  );
};

export default UserDashboard;
