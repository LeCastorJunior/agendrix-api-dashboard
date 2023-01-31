//import axios from "axios";
import ServerAPI from "../../../../services/ServerAPI";
import { HandleServerErrors } from "../utils";

export default async () => {
  try {
    const response: GenericObject = await ServerAPI.get(
      `/integrations/agendrix/my-organization-members-ae?page=1&page_size=100&search[main_position_id]=8b91c0e8-a0f5-4a13-97b3-5d0ab69170db`
    );
    const result = await response.json();
    const listId: string[] = result.data.map((item: any) => item.id);
    if (response.ok) return listId;
    else HandleServerErrors(result);
  } catch (e: any) {
    alert(e.message);
  }
};
