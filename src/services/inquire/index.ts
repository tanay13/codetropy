import inquirer from 'inquirer';
import work from '../..';
const pwd = process.cwd();
export function askQuestion() {
  inquirer
    .prompt([
      {
        name: 'team',
        message: 'What is your project name?',
      },
    ])
    .then((answers) => {
      console.info('Answer:', answers.team);
      work(pwd, answers.team);
    });
}
