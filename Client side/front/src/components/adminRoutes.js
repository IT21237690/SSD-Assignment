import axios from 'axios';



export const getUnapprovedTeachers = async () => {
  try {
    const response = await axios.get(`/admin/teachers/unapproved`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const approveTeacher = async (teacherId) => {
  try {
    const response = await axios.patch(`/admin/teachers/${teacherId}/approve`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
