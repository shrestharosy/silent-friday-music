import * as actionConstants from 'src/constants/actions';
import { IFillRoomActionPayload } from 'src/scripts/background/reducers/room';
import { IFillBroadcastActionPayload } from 'src/scripts/background/reducers/broadcast';
import { IFillProfileActionPayload } from 'src/scripts/background/reducers/profile';

export interface FillBroadcastActionType {
  type: typeof actionConstants.FILL_BROADCAST_ACTION;
  payload: IFillBroadcastActionPayload;
}

export interface FillRoomActionType {
  type: typeof actionConstants.FILL_ROOM_ACTION;
  payload: IFillRoomActionPayload;
}

export interface FillProfileActionType {
  type: typeof actionConstants.FILL_PROFILE_ACTION;
  payload: IFillProfileActionPayload;
}
