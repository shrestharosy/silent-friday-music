export type ActionType<T, P> = {
  type: T;
  payload: P;
};

export interface ActionCallbacks {
  resolve?: Function;
  reject?: Function;
}
