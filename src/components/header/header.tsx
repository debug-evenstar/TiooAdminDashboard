import { BsArrowLeft } from "react-icons/bs";
import Profile from "../profile/profile";
import { useNavigate } from "react-router-dom";

export default function Header({
  variant,
  title,
  hasBack,
}: {
  variant?: boolean;
  title: string;
  hasBack?: boolean;
}) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {!variant ? (
        <div className="px-[24px] h-[80px] flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            {hasBack && (
              <button onClick={handleBack}>
                <BsArrowLeft fontWeight={600} size={24} />
              </button>
            )}
            <h1 className="text-primary text-[22px]">{title}</h1>
          </div>
          <Profile />
        </div>
      ) : (
        <div className="px-[32px] h-[95px] flex items-center justify-between border-b">
          <div className="flex space-x-6 items-center">
            <button
              onClick={() => navigate(-1)}
              className="border-main border rounded-[8px] py-[11px] font-[500] px-[50px] h-[47px] text-main "
            >
              Back
            </button>
            <h1 className="text-primary text-[24px]">{title}</h1>
          </div>
          <Profile />
        </div>
      )}
    </>
  );
}
