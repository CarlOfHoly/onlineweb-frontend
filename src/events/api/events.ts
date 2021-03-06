import { getUser } from 'authentication/api';
import { IAuthUser } from 'authentication/models/User';

import { get, getAllPages, IBaseAPIParameters, IAPIData } from 'common/utils/api';
import { listResource } from 'common/resources';
import { IQueryObject } from 'common/utils/queryString';
import { EventTypeEnum, IAttendanceEvent, IEvent } from '../models/Event';
import { IExtra } from '../models/Extras';

export interface IEventAPIParameters extends IQueryObject {
  event_start__gte?: string;
  event_start__lte?: string;
  event_end__gte?: string;
  event_end__lte?: string;
  event_type?: EventTypeEnum[] | EventTypeEnum;
  is_attendee?: 'True' | 'False';
  query?: string;
  attendance_event__isnull?: 'True' | 'False';
  ordering?: string;
}

const EVENTS_API_URL = '/api/v1/event/events/';
const ATTENDANCE_EVENT_API_URL = '/api/v1/event/attendance-events/';
const EVENT_EXTRAS_URL = '/extras/';

export const listEvents = listResource<IEvent, IEventAPIParameters>(EVENTS_API_URL);

export const getEvents = async (args?: IEventAPIParameters & IBaseAPIParameters): Promise<IEvent[]> => {
  const data = await get<IAPIData<IEvent>>(EVENTS_API_URL, { format: 'json', ...args });
  return data.results;
};

export const getAllEvents = async (args: IEventAPIParameters, user?: IAuthUser): Promise<IEvent[]> => {
  const data = await getAllPages<IEvent>(EVENTS_API_URL, { format: 'json', page_size: 80, ...args }, { user });
  return data;
};

export const getEvent = async (id: number): Promise<IEvent> => {
  const event = await get<IEvent>(EVENTS_API_URL + id + '/', { format: 'json' });
  return event;
};

export const getAttendanceEvent = async (id: number): Promise<IAttendanceEvent> => {
  const user = await getUser();
  const attendanceEvent = await get<IAttendanceEvent>(
    `${ATTENDANCE_EVENT_API_URL}${id}/`,
    { format: 'json' },
    { user }
  );
  return attendanceEvent;
};

export const getEventExtras = async (eventId: number): Promise<IExtra[]> => {
  try {
    const ret = await get<IExtra[]>(`${ATTENDANCE_EVENT_API_URL}${eventId}${EVENT_EXTRAS_URL}`);
    return ret;
  } catch (response) {
    throw new Error('Kunne ikke hente valgmuligheter for arrangementet!');
  }
};

export interface IControlledFetch<T> {
  controller: AbortController;
  data: Promise<IAPIData<T>>;
}

export const controlledGetEvents = (args?: IEventAPIParameters): IControlledFetch<IEvent> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const data = get<IAPIData<IEvent>>(EVENTS_API_URL, { format: 'json', ...args }, { signal });
  return { data, controller };
};
