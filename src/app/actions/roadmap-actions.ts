"use server";

import { Subtask } from "@/types/roadmap-flow";

export async function updateNodeStatus(nodeId: string, isDone: boolean) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`[DB Simulation] Node ${nodeId} status updated to: ${isDone}`);
  return { success: true, nodeId, isDone };
}

export async function updateSubtaskStatus(
  nodeId: string,
  subtaskId: string,
  status: "done" | "todo",
) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log(
    `[DB Simulation] Node ${nodeId} -> Subtask ${subtaskId} status updated to: ${status}`,
  );
  return { success: true, nodeId, subtaskId, status };
}

export async function updateNodeWithSubtasks(
  nodeId: string,
  isDone: boolean,
  subtasks?: Subtask[],
) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let message = `[DB Simulation] Node ${nodeId} status updated to: ${isDone}`;
  if (subtasks && subtasks.length > 0) {
    message += ` and ${subtasks.length} subtasks updated`;
  }

  console.log(message);
  return { success: true, nodeId, isDone, subtasks };
}
