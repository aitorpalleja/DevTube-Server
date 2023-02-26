import CreatorsData from '../../models/creatorsModel.js'

const getCreatorsData = async () => {
  try {
    return await CreatorsData.find({});
  } catch (err) {
    throw new Error(err.message);
  }
};

export default getCreatorsData;