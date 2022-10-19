import { EventSystemUser } from "../../enums/eventSystemUser";
import { EventType } from "../../enums/eventType";
import { EventView } from "../view/event.view";

export class EventExport {
  message: string;
  appIcon: string;
  appName: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  ip: string;
  type: string;
  installationId: string;
  systemUser: EventSystemUser;

  constructor(event: EventView) {
    this.message = event.humanReadableMessage;
    this.appIcon = event.appIcon;
    this.appName = event.appName;
    this.userId = event.userId;
    this.userName = event.userName;
    this.userEmail = event.userEmail;
    this.date = event.date;
    this.ip = event.ip;
    this.type = EventType[event.type];
    this.installationId = event.installationId;
    this.systemUser = event.systemUser;
  }
}
