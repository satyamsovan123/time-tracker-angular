import { Injectable } from '@angular/core';
import { Help } from '../../models/help.model';

/**
 * This service is used to get the data for {@link HelpComponent}
 */
@Injectable({
  providedIn: 'root',
})
export class GenerateHelpDataService {
  /**
   * This is the variable that is of {@link Help} interface. It has the pre initialized objects with different questions and answers.
   *
   * @type {Help}
   */
  help: Help[] = [
    {
      question: 'What is Time Tracker?',
      answer:
        "Time Tracker is a free web application used to track and log your precious time. You can log your hours every day for your desired and check the dashboard to get some insights. It motivates you to push further. It's secure, and private.",
    },
    {
      question: 'Is Time Tracker free?',
      answer:
        "Yes, it's free forever, with no limitations. We don't track you either. The best part is **DRUM ROLL** no ads 🥳!",
    },
    {
      question: 'How to use Time Tracker?',
      answer:
        'Time Tracker is very intuitive. You can use it in your computer, tablet or phone (iOS / Android). All you need is just a browser! However, we recommend using computer, for better experience. After signing up, you can log your time on tasks section using the add new timing button, you can edit or delete them. You need to save your changes now, and if you sign in the next day, and take a detour to dashboard section, you will get some insights with charts. You can even delete data for any day you like. Get insights and stay motivated.',
    },
    {
      question: 'How do I contact you?',
      answer:
        "For feedbacks, contributions, critiques, or anything, you can email us. We'll be glad to have a chat.",
    },
    {
      question: 'How do I delete my account on Time Tracker?',
      answer:
        'After signing in, go to your dashboard, in the very top paragraph, there is an option to delete your account. However, do keep in mind that this is an irreversible process. For any feedbacks, please do reach out to us.',
    },
    {
      question: 'I need a joke on time, do you have any?',
      answer:
        "Actually, no. I don't have time for jokes. But, I do have one timeless advice though, 'You should never try to wear a belt made out of watch belts, it's a waist of time.' ",
    },
  ];

  /**
   * This method returns the help variable, which has questions and answers
   *
   * @returns {{Help}} help
   */
  getHelpData() {
    return this.help;
  }
}
