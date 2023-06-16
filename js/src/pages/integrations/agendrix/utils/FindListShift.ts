import ServerAPI from "../../../../services/ServerAPI";
import { HandleServerErrors } from ".";
import { Shift } from "../interface/Shift";

export default async (id: string): Promise<Shift[]> => {
  //todo:add generate date start and end
  const date_start = getFirstDayOfPreviousMonth();
  const date_end = getLastDayOfPreviousMonth();

  try {
    const response: GenericObject = await ServerAPI.get(
      `/integrations/agendrix/detail-member-time-entries?search[position_id]=8b91c0e8-a0f5-4a13-97b3-5d0ab69170db&search[member_id]=${id}&search[from]=${date_start}&search[to]=${date_end}`
    );
    const result = await response.json();

    if (response.ok) return result.data;
    else HandleServerErrors(result);
  } catch (e: any) {
    alert(e.message);
  }
  let response: Shift[] = [];
  return response;
};

function getFirstDayOfPreviousMonth(): string {
	let date = new Date();

	let firstDayOfPreviousMonth = new Date(
		date.getFullYear(),
		date.getMonth() - 1,
		1,
		2,
		0,
		0
	);

	return firstDayOfPreviousMonth.toISOString();
}

function getLastDayOfPreviousMonth(): string {
	let date = new Date();

	let lastDayOfPreviousMonth = new Date(
		date.getFullYear(),
		date.getMonth(),
		0,
		2,
		0,
		0
	);

	return lastDayOfPreviousMonth.toISOString();
}
