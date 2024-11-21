import axios from 'axios';

const searchVarieties = async (query) => {
  const url = 'http://api.tropicalfruitandveg.com/tfvjsonapi.php';

  try {
    const response = await axios.get(url, {
      params: {
        tfvitem: query,
      },
    });

    if (response.status === 200) {
      console.log('Data received:', response.data);
      return response.data;
    } else {
      console.error(`Request failed with status: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error('Error searching varieties:', error.message);
    return [];
  }
};

export default searchVarieties;