import React, { useCallback, useState } from "react";
import { MdVerified, MdEdit } from "react-icons/md";
import { EStatus, EVerified, IUser } from "../api/types/user.type";
import { Skeleton } from "./ui/skeleton";
import WideButton from "./WideButton";
import { Switch } from "./ui/switch";
import { FormControl, MenuItem, Select } from "@mui/material";
import { RiCloseLargeLine } from "react-icons/ri";
import { Button } from "./ui/button";
import { useUpdateUserStatusMutation } from "../api/slices/moderator.slices";

interface UserCardProps {
  user: IUser | null;
}

// Custom Drawer component
const CustomDrawer: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  user: IUser;
  children: React.ReactNode;
}> = ({ isVisible, onClose, user, children }) => {
  const [type, setType] = useState(user.status);
  const [useUserData, setUserData] = useState<EVerified>(user.verified);
  const onTypeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setType(e.target.value as any);

  const [updateUser] = useUpdateUserStatusMutation();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] overflow-visible"
        style={{ maxHeight: "calc(100% - 100px)" }}
      >
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          {children}
        </div>
        <div className="pt-16 px-4 pb-4 max-h-full overflow-y-auto">
          {/* Drawer content */}
          <p className="text-center font-semibold text-[1.2rem]">
            {user.full_name}
          </p>

          <div className="w-full flex flex-col justify-center items-start gap-2">
            <p className="text-[1.1rem] font-semibold">Status</p>
            <FormControl
              fullWidth
              sx={{
                borderRadius: "0.75rem",
                marginBottom: "1.25rem",
                backgroundColor: "#F9FAFB",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0.75rem",
                  "& fieldset": {
                    borderColor: "#D1D5DB",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D1D5DB",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #D1D5DB",
                  },
                },
              }}
            >
              <Select
                value={type}
                onChange={onTypeChange as any}
                displayEmpty
                sx={{
                  "& .MuiSelect-select": {
                    borderRadius: "0.75rem",
                  },
                }}
              >
                {
                  Object.values(EStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <div className="w-full flex justify-start items-center gap-2 mb-3">
              <Switch
                id="airplane-mode"
                style={{
                  display: setUserData == undefined ? "none" : "block",
                }}
                checked={useUserData == EVerified.verified ? true : false}
                disabled={setUserData == undefined}
                onCheckedChange={(checked) => setUserData(checked ? EVerified.verified : EVerified.pending)}
              />
              <p>Verified</p>
            </div>
          </div>

          <WideButton label="Done" color="bg-content-color" clickAction={async () => {
            console.log("update user status", type, useUserData);
            try {
              await updateUser({
                userId: user._id,
                update: { status: type as any, verified: useUserData as any },
              }).unwrap();
              onClose();
            } catch (error) {

            }

          }} />

          <Button
            variant="outline"
            className="absolute top-4 right-2 border-none shadow-none"
            onClick={async (e) => {
              e.preventDefault();
            }}
          >
            <RiCloseLargeLine className="text-[1rem] text-content-color" />
          </Button>
        </div>
      </div>
    </div>
  );
};

function UserCard({ user }: UserCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const openDrawer = useCallback(() => setIsVisible(true), []);
  const closeDrawer = useCallback(() => setIsVisible(false), []);

  if (!user) {
    return (
      <div className="flex justify-start items-center p-2 w-full rounded-lg bg-neutral-100 leading-4 select-none gap-3">
        <Skeleton className="h-[61px] aspect-square rounded-full" />
        <div className="flex-grow flex flex-col justify-center items-start h-full">
          <Skeleton className="h-[10px] w-[55%] rounded-md" />
          <Skeleton className="h-[6px] w-[50%] mt-[6px] rounded-md" />
          <Skeleton className="h-[6px] w-[40%] mt-[2px] rounded-md" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex justify-start items-center gap-2 py-2 bg-[#F6F6F6] px-3 rounded-lg">
        <img
          src={user.profile_img}
          className="w-[61px] aspect-square rounded-full"
        />
        <div className="w-full flex-grow flex flex-col justify-center items-start">
          <p className="flex items-center gap-1 leading-none font-bold">
            {user.first_name} {user.last_name}
            {user.verified == EVerified.verified && (
              <MdVerified className="text-content-color" />
            )}
          </p>
          <p className="text-[.8rem] text-slate-400 leading-none mt-2 font-bold">
            {user.email}
          </p>
          <p className="text-[.8rem] text-slate-400 leading-none font-bold">
            {user.phone_number}
          </p>
        </div>
        <MdEdit
          className="text-[2.2rem] text-content-color"
          onClick={openDrawer}
        />
      </div>

      <CustomDrawer isVisible={isVisible} onClose={closeDrawer} user={user}>
        <img
          src={user.profile_img}
          className="w-[100px] aspect-square rounded-full shadow-lg"
        />
      </CustomDrawer>
    </>
  );
}

export default UserCard;
