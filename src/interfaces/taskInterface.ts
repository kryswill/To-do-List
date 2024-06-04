// Defining the structure of a Task item
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}


// Interface defining the props for the TodoItem component
export interface Props {
  todo: Task;
  onEdit: (todo: Task) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

// Interface defining the props for the TodoList component
export interface ListProps {
  todo: Task[];
  onEdit: (todo: Task) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}