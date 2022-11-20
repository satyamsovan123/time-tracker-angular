import { Injectable } from '@angular/core';
import { Help } from '../../models/help.model';

@Injectable({
  providedIn: 'root',
})
export class GenerateHelpDataService {
  help: Help[] = [
    {
      question: 'What is Time Tracker?',
      answer:
        "Time Tracker is a free web application used to track and log your precious time. You can log your hours every day and check the dashboard to get some insights. It motivates you to push further. It's secure, and private.",
    },
    {
      question: 'Is Time Tracker free?',
      answer:
        "Yes, it's free forever. The best part is **DRUM ROLL** no ads 🥳!",
    },
    {
      question: 'How to use Time Tracker?',
      answer:
        'Time Tracker is very intuitive to use. You can use it in your computer, tablet or phone. However, we recommned using computer, for better experience. Firstly, sign up for free and then sign in. You can log your time on tasks section using the add new timings button, you can edit or delete them. After saving it for the day, you can sign in for the next day to see the dashboard and get some insights with charts. You can even delete data for every single day. Get insights and stay motivated.',
    },
    {
      question: 'How do I contact you?',
      answer:
        "For feedbacks, contributions, critiques, or anything, you can --------------. I'll be glad to have a chat.",
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
  constructor() {}

  getHelpData() {
    return this.help;
  }
}
