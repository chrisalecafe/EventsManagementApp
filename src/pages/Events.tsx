import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IEvent } from "../interfaces/IEvent";
import EventService from "../services/event";
import { Link as RouterLink } from "react-router-dom";
import { Groups, Workspaces } from "@mui/icons-material";
export const Events = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [found, setfound] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const eventList = await EventService.all();
      const evts: IEvent[] = eventList?.Events;
      if (evts.length > 0) {
        setfound(true);
      }
      setEvents(evts);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Typography variant="h1">Events</Typography>
      <Divider sx={{ marginBottom: 2, marginTop: 3 }} />

      {!!!found ? (
        <Alert variant="filled" color="info" severity="info">
          No events available
        </Alert>
      ) : null}
      <Grid container spacing={2}>
        {events.map((event, index) => {
          let participants = 0;
          event.groups?.map((gr) => {
            participants += gr
              ? gr?.participants
                ? gr?.participants?.length
                : 0
              : 0;
          });
          const { _id, name, start_date, end_date, description } = event;
          return (
            <Grid xs={12} sm={6} item key={_id}>
              <Card variant="outlined">
                <CardContent style={{ height: "10vw" }}>
                  <Grid xs={12} sm={12}>
                    <Chip
                      icon={<Workspaces />}
                      style={{ marginRight: 2 }}
                      label={`${event.groups?.length} group(s)`}
                      color="success"
                    />

                    <Chip
                      icon={<Groups />}
                      label={`${participants} participant(s)`}
                      color="info"
                    />
                  </Grid>
                  <Divider sx={{ marginBottom: 1, marginTop: 1 }} />

                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h6"}
                    gutterBottom
                  >
                    {name}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    display="block"
                    variant="caption"
                    color="text.secondary"
                  >
                    {`${start_date} to ${end_date}`}
                  </Typography>
                  <Typography
                    className={"MuiTypography--subheading"}
                    variant={"caption"}
                  >
                    {description.length > 200
                      ? description.substring(0, 200) + " ....."
                      : description}
                  </Typography>
                  <Divider light />
                </CardContent>
                <CardActions>
                  <RouterLink to={`/Register/${_id}`}>
                    <Button color="primary" size="small">
                      Register
                    </Button>
                  </RouterLink>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
