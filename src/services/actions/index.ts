import axios from 'axios';

export async function findTeam(teamName: string): Promise<Boolean> {
  let flag = false;
  axios
    .get(`http://localhost:8080/findTeam/${teamName}`)
    .then((res) => {
      if (res.data.response) flag = true;
    })
    .catch(function (error) {
      console.log(error);
    });
  return false;
}

export async function saveTeam(teamName: string): Promise<void> {
  axios
    .post(`http://localhost:8080/saveTeam`, { team: teamName })
    .then(function (res) {})
    .catch(function (error) {
      console.log(error);
    });
}
