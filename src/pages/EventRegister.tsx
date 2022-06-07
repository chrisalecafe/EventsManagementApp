import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SaveOutlined, Delete, Add } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  styled,
  TextField,
  Typography,
} from "@mui/material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { countries } from "country-list-json";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { DateTimePicker } from "@mui/x-date-pickers";
import { IEvent } from "../interfaces";
import { IGroup } from "../interfaces/IGroup";
import EventService from "../services/event";
import { useNavigate } from "react-router-dom";
type FormData = {
  type: "Donation" | "Survey" | "Social event" | "Other";
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  country: string;
  city: string;
  state: string;
  address: string;
  zip: string;
};

const schema = yup
  .object({
    type: yup.string().required("Required"),
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    start_date: yup.date(),
    end_date: yup
      .date()
      .min(yup.ref("start_date"), "End date has to be more than start date"),
    country: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    address: yup.string().required("Required"),
    zip: yup.string().required("Required"),
  })
  .required();
const types: string[] = ["Donation", "Survey", "Social event", "Other"];
export const EventRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [group, setGroup] = useState<string>();
  function handleChangeGroup(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setGroup(event.target.value);
  }

  const [groups, setGroups] = useState<IGroup[]>([]);
  const handleOnAddGroupClick = () => {
    if (group !== undefined) {
      const newGroup: IGroup[] = groups?.concat({ name: group, id: uuidv4() });
      setGroups(newGroup);
      setGroup("");
    }
  };
  const handleRemoveGroup = (id: any) => {
    console.log(id);
    const newList = groups.filter((item) => item.id !== id);
    setGroups(newList);
  };
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log({ data });
    let send: IEvent;

    send = {
      ...data,
      active: true,
      groups:
        groups.length > 0 ? [...groups] : [...groups, { name: "Default" }],
    };
    // console.log("send", send);
    const add = await EventService.add(send);
    console.log("add", add);

    if (add?.message === "ok") {
      navigate(`/`);
    }
  };
  const [startvalue, setStartValue] = useState<Date | null>(new Date());

  const handleStartChange = (newValue: any) => {
    setStartValue(new Date(newValue?._d));
  };
  const [endvalue, setEndValue] = useState<Date | null>(new Date());
  const handleEndChange = (newValue: any) => {
    setEndValue(new Date(newValue?._d));
  };
  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};
  const handleCountryChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};
  const [valueSelectType, setValueSelectType] = useState();

  return (
    <>
      <Typography variant="h1">Event</Typography>
      <Divider sx={{ marginBottom: 2, marginTop: 3 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={!!errors.type}
              helperText={errors.type?.message}
              fullWidth
              id="type"
              select
              label="Select Type"
              value={valueSelectType}
              {...register("type")}
              onChange={(e) => handleChange(e)}
            >
              {types.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              id="name"
              label="Event Name"
              variant="outlined"
              {...register("name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              multiline
              id="description"
              label="Description"
              variant="outlined"
              {...register("description")}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginTop: 2, marginRight: 5 }}
              variant="subtitle1"
            >
              Schedule
            </Typography>
            <Divider sx={{ marginBottom: 2, marginTop: 0 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="Start Date Time "
              mask="__/__/____ __:__ _m"
              value={startvalue}
              onChange={handleStartChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.start_date}
                  helperText={errors.start_date?.message}
                  fullWidth
                  {...register("start_date")}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="End Date Time "
              mask="__/__/____ __:__ _m"
              value={endvalue}
              onChange={handleEndChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.end_date}
                  helperText={errors.end_date?.message}
                  fullWidth
                  {...register("end_date")}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{ marginTop: 2, marginRight: 5 }}
              variant="subtitle1"
            >
              Location
            </Typography>
            <Divider sx={{ marginBottom: 2, marginTop: 0 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={!!errors.country}
              helperText={errors.country?.message}
              fullWidth
              id="country"
              select
              label="Select country"
              {...register("country")}
              onChange={(e) => handleCountryChange(e)}
            >
              {countries.map((ctry: any) => (
                <MenuItem key={ctry.name} value={ctry.name}>
                  {ctry.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={!!errors.state}
              helperText={errors.state?.message}
              fullWidth
              id="state"
              label="state"
              variant="outlined"
              {...register("state")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={!!errors.city}
              helperText={errors.city?.message}
              fullWidth
              id="city"
              label="City"
              variant="outlined"
              {...register("city")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              error={!!errors.zip}
              helperText={errors.zip?.message}
              fullWidth
              id="zip"
              label="Zip Code"
              variant="outlined"
              {...register("zip")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.address}
              helperText={errors.address?.message}
              fullWidth
              id="address"
              label="Address"
              variant="outlined"
              {...register("address")}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{ marginTop: 2, marginRight: 5 }}
              variant="subtitle1"
            >
              Groups
            </Typography>
            <Divider sx={{ marginBottom: 2, marginTop: 0 }} />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id="group"
              value={group}
              onChange={handleChangeGroup}
              label="Group"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              color="secondary"
              size="large"
              sx={{ ml: "auto" }}
              variant="contained"
              type="button"
              onClick={handleOnAddGroupClick}
              endIcon={<Add />}
            >
              Add group
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <List>
              {groups?.map((group: IGroup, index: number) => (
                <>
                  <ListItem
                    key={group.id}
                    secondaryAction={
                      <IconButton
                        edge="start"
                        onClick={() => handleRemoveGroup(group.id)}
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={group.name} />
                  </ListItem>
                  <Divider key={group.id + index} component="li" />
                </>
              ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              size="large"
              sx={{ ml: "auto" }}
              variant="contained"
              type="submit"
              endIcon={<SaveOutlined />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
