import ServerAPI from "../../../../services/ServerAPI";
import { HandleServerErrors } from ".";

export default async (id: string) => {
  //todo:add generate date start and end
  try {
    const response: GenericObject = await ServerAPI.get(
      `/integrations/agendrix/detail-member-time-entries?search[position_id]=8b91c0e8-a0f5-4a13-97b3-5d0ab69170db&search[member_id]=${id}&search[from]=2023-01-01T00:00+00Z&search[to]=2023-01-31T00:00+00Z`
    );
    const result = await response.json();
    if (response.ok) return result.data;
    else HandleServerErrors(result);
  } catch (e: any) {
    alert(e.message);
  }
};
