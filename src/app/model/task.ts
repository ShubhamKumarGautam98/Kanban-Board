export type Task={
     taskId?:number
     taskName?:string
     taskDescription?:string
     dueDate?:string
     priority: 'Low' | 'Medium' | 'High';
     assignTo?:string
     assignedBy?:string
     status?:string
}