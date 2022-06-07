import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HowToReg, SaveOutlined } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IEvent, IGroup, IRegistration } from "../interfaces";
import RegistrationService from "../services/registration";
import EventService from "../services/event";
import { Summary } from "../components/ui";
import useAuth from "../hooks/useAuth";
type FormData = {
  id?: string;
  name?: string;
  group: string;
};

const schema = yup
  .object({
    name: yup.string(),
    id: yup.string(),
    group: yup.string().required(),
  })
  .required();

export const Register = () => {
  const [event, setEvent] = useState<IEvent>();
  const [found, setfound] = useState<boolean>(false);
  const [external, setExternal] = useState<boolean>(true);
  const [valueSelect, setValueSelect] = useState<any>();
  const navigate = useNavigate();
  const [valid, setValueValid] = useState<boolean>(true);
  const { _id } = useAuth();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        const res = await EventService.get(id ? id : "");
        setEvent(res?.event);

        setfound(true);
      }
    };

    fetchData().catch(console.error);
  }, []);
  const handleExternal = () => {
    setExternal(!external);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setValueSelect(event.target.value);
  };
  const completed = (name: string | undefined, id: any) => {
    if (
      name !== undefined &&
      id !== undefined &&
      name !== null &&
      id !== null &&
      name !== "" &&
      id !== ""
    ) {
      setValueValid(true);
      return true;
    }
    setValueValid(false);
    return false;
  };
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let reg: IRegistration = {
      id_event: event?._id,
      id_group: data.group,
      id_user: _id,
      external: false,
    };
    if (external && completed(data.name, data.id)) {
      reg.id_external = data.id;
      reg.name = data.name;
      reg.external = true;
    }
    if (valid) {
      const add = await RegistrationService.add(reg);
      if (add?.message === "ok") {
        navigate(`/`);
      }
    }
  };

  return (
    <>
      <Typography variant="h1">Register</Typography>
      <Divider sx={{ marginBottom: 2, marginTop: 3 }} />
      <Summary
        name={event?.name ? event?.name : ""}
        description={event?.description ? event?.description : ""}
        date={`${event?.start_date} to ${event?.end_date}  `}
        found
        event={event}
      ></Summary>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Checkbox defaultChecked onChange={handleExternal} />}
              label="Register external participant"
            />
          </Grid>
          {external === true ? (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.id}
                  helperText={errors.id?.message}
                  fullWidth
                  id="id"
                  label="Id"
                  variant="outlined"
                  {...register("id")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                  fullWidth
                  id="name"
                  label="Name"
                  variant="outlined"
                  {...register("name")}
                />
              </Grid>

              {valid === true ? null : (
                <Grid item xs={12}>
                  <Typography
                    color={"error"}
                    variant="caption"
                    display="block"
                    gutterBottom
                  >
                    Id and name are needed
                  </Typography>
                </Grid>
              )}
            </>
          ) : null}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="group-label">group</InputLabel>
              <Select
                error={!!errors.group}
                labelId="group-label"
                id="group-select"
                label="group"
                {...register("group")}
                onChange={handleChange}
              >
                {event?.groups?.map((option: IGroup) => (
                  <MenuItem value={option._id}>{option.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.group?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              size="large"
              sx={{ ml: "auto" }}
              variant="contained"
              type="submit"
              endIcon={<HowToReg />}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
