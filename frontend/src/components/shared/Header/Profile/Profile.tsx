import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useQuery } from "react-query";
import { getUserProfileAPI } from "../../../../api/getUserProfile.api";
import { Box, Skeleton } from "@mui/material";

export const Profile = () => {
  const { token } = useContext(AuthContext);

  const { isLoading, data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfileAPI(token),
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ marginRight: "10px" }}
        />
        <Skeleton variant="rounded" width={100} height={40} />
      </Box>
    );

  return <div>{data.name}</div>;
};
