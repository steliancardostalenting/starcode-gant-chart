import { Injectable } from '@angular/core';

export class Task {
  id!: number;

  parentId!: number;

  title!: string;

  start!: Date;

  end!: Date;

  progress!: number;
}

export class Dependency {
  id!: number;

  predecessorId!: number;

  successorId!: number;

  type!: number;
}

export class Resource {
  id!: number;

  text!: string;
}

export class ResourceAssignment {
  id!: number;

  taskId!: number;

  resourceId!: number;
}

const tasks: Task[] = [
  {
    id: 1,
    parentId: 0,
    title: 'Software Development',
    start: new Date('2019-02-21T05:00:00.000Z'),
    end: new Date('2019-07-04T12:00:00.000Z'),
    progress: 31,
  },
  {
    id: 2,
    parentId: 1,
    title: 'Scope',
    start: new Date('2019-02-21T05:00:00.000Z'),
    end: new Date('2019-02-26T09:00:00.000Z'),
    progress: 60,
  },
  {
    id: 3,
    parentId: 2,
    title: 'Determine project scope',
    start: new Date('2019-02-21T05:00:00.000Z'),
    end: new Date('2019-02-21T09:00:00.000Z'),
    progress: 100,
  },
  {
    id: 4,
    parentId: 2,
    title: 'Secure project sponsorship',
    start: new Date('2019-02-21T10:00:00.000Z'),
    end: new Date('2019-02-22T09:00:00.000Z'),
    progress: 100,
  },
  {
    id: 5,
    parentId: 2,
    title: 'Define preliminary resources',
    start: new Date('2019-02-22T10:00:00.000Z'),
    end: new Date('2019-02-25T09:00:00.000Z'),
    progress: 60,
  },
  {
    id: 6,
    parentId: 2,
    title: 'Secure core resources',
    start: new Date('2019-02-25T10:00:00.000Z'),
    end: new Date('2019-02-26T09:00:00.000Z'),
    progress: 0,
  },
  {
    id: 7,
    parentId: 2,
    title: 'Scope complete',
    start: new Date('2019-02-26T09:00:00.000Z'),
    end: new Date('2019-02-26T09:00:00.000Z'),
    progress: 0,
  },
  {
    id: 8,
    parentId: 1,
    title: 'Analysis/Software Requirements',
    start: new Date('2019-02-26T10:00:00.000Z'),
    end: new Date('2019-03-18T09:00:00.000Z'),
    progress: 80,
  },
  {
    id: 9,
    parentId: 8,
    title: 'Conduct needs analysis',
    start: new Date('2019-02-26T10:00:00.000Z'),
    end: new Date('2019-03-05T09:00:00.000Z'),
    progress: 100,
  },
];

const dependencies: Dependency[] = [
  {
    id: 1,
    predecessorId: 3,
    successorId: 4,
    type: 0,
  },
  {
    id: 2,
    predecessorId: 4,
    successorId: 5,
    type: 0,
  },
  {
    id: 3,
    predecessorId: 5,
    successorId: 6,
    type: 0,
  },
  {
    id: 4,
    predecessorId: 6,
    successorId: 7,
    type: 0,
  },
  {
    id: 5,
    predecessorId: 7,
    successorId: 9,
    type: 0,
  },
  {
    id: 6,
    predecessorId: 9,
    successorId: 10,
    type: 0,
  },
  {
    id: 7,
    predecessorId: 10,
    successorId: 11,
    type: 0,
  },
  {
    id: 8,
    predecessorId: 11,
    successorId: 12,
    type: 0,
  },
  {
    id: 9,
    predecessorId: 12,
    successorId: 13,
    type: 0,
  },
];

const resources: Resource[] = [
  {
    id: 1,
    text: 'Management',
  },
  {
    id: 2,
    text: 'Project Manager',
  },
  {
    id: 3,
    text: 'Analyst',
  },
  {
    id: 4,
    text: 'Developer',
  },
  {
    id: 5,
    text: 'Testers',
  },
  {
    id: 6,
    text: 'Trainers',
  },
  {
    id: 7,
    text: 'Technical Communicators',
  },
  {
    id: 8,
    text: 'Deployment Team',
  },
];

const resourceAssignments: ResourceAssignment[] = [
  {
    id: 0,
    taskId: 3,
    resourceId: 1,
  },
  {
    id: 1,
    taskId: 4,
    resourceId: 1,
  },
  {
    id: 2,
    taskId: 5,
    resourceId: 2,
  },
  {
    id: 3,
    taskId: 6,
    resourceId: 2,
  },
  {
    id: 4,
    taskId: 9,
    resourceId: 3,
  },
  {
    id: 5,
    taskId: 10,
    resourceId: 3,
  },
  {
    id: 6,
    taskId: 11,
    resourceId: 2,
  },
  {
    id: 7,
    taskId: 12,
    resourceId: 2,
  },
  {
    id: 8,
    taskId: 12,
    resourceId: 3,
  },
  {
    id: 9,
    taskId: 13,
    resourceId: 3,
  },
];

@Injectable()
export class Service {
  getTasks(): Task[] {
    return tasks;
  }

  getDependencies(): Dependency[] {
    return dependencies;
  }

  getResources(): Resource[] {
    return resources;
  }

  getResourceAssignments(): ResourceAssignment[] {
    return resourceAssignments;
  }
}
