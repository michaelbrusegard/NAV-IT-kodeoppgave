import axios from 'axios';

// Fetches Grunnbeløpet from the NAV API using axios
async function retrieveGrunnbelopet() {
  try {
    const response = await axios.get('https://g.nav.no/api/v1/grunnbeløp');
    // Fetches the G value from the response and returns it
    // I am personally not a fan of using æ, ø, å in variable names because I have had issues with it using javascript
    // with Google Cloud Platform (GCP) before, but I kept it here to match the API response.
    if (response.data && response.data.grunnbeløp) {
      const G = response.data.grunnbeløp;
      return G;
    } else {
      throw new Error('G value not found in the response');
    }
  } catch (error) {
    throw new Error('Error fetching Grunnbelopet: ' + error.message);
  }
}

export default retrieveGrunnbelopet;
