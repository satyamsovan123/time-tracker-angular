export interface Task {
  startTime?: string;
  endTime?: string;
  timeUsed?: number;
}

// export class Task {
//   startTime: Date;
//   endTime: Date;
//   timeUsed: Number;

//   constructor(task?: Task) {
//     this.startTime = task?.startTime || new Date();
//     this.endTime = task?.endTime || new Date();
//     this.timeUsed = task?.timeUsed || 0;
//   }
// }
