import { Alert, Typography, Divider } from "@mui/material";
import { IEvent } from "../../interfaces";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { countries } from "country-list-json";
interface IProps {
  name: string;
  description: string;
  date: string;
  found: boolean;
  event?: IEvent;
}
export const Summary = ({ name, description, date, found, event }: IProps) => {
  return (
    <>
      {!!!found ? (
        <Alert variant="filled" color="info" severity="info">
          Not Foud
        </Alert>
      ) : (
        <></>
      )}
      <Typography variant="h5">{`Event: ${name} `}</Typography>
      <Typography variant="caption">{`Date: ${date} `}</Typography>
      <Typography variant="subtitle2">{`Description: ${description} `}</Typography>
      <Typography variant="h6">{`Location  `}</Typography>
      <Typography variant="subtitle2">{`Country: ${
        // countries.find((x: any) => x.code === event?.country).name
        event?.country
      } | State: ${event?.state} | City: ${event?.city}  | Address: ${
        event?.address
      }  `}</Typography>

      <Divider sx={{ marginBottom: 2, marginTop: 3 }} />
    </>
  );
};
