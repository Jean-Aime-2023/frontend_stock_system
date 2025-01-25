"use client";

import { useEffect, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { UserStore } from "@/store/user-store";
import ChangeEmailDialog from "@/components/auth/ChangeEmailDialog";
import { useSendActivationEmail, useActivateAccount } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { CirculaLoader } from "@/assets/icon";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const Verification = () => {
  const [otp, setOtp] = useState<string>("".padStart(6, ""));
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const { user } = UserStore();
  const validateEmailMutation = useActivateAccount();
  const sendOtpMutation = useSendActivationEmail();
  const router = useRouter();

  // Countdown logic for resend OTP
  useEffect(() => {
    if (!canResend && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleSendOtp = async () => {
    try {
      const response = await sendOtpMutation.mutateAsync({ email: user.email });
      if (response.success) {
        toast.success(response.message);
        setTimer(60);
        setCanResend(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleChangeOtp = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast.error("Enter a valid OTP.");
      return;
    }
    try {
      const response = await validateEmailMutation.mutateAsync({
        email: user.email,
        code: otp,
      });
      if (response.success) {
        toast.success("Verification complete.");
        router.push("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Verification failed. Please try again.");
    }
  };

  return (
    <main className="w-full overflow-x-hidden overflow-y-auto bg-cover bg-no-repeat px-[.5rem]">
      <section className="mt-[1.5rem] sm:mt-[3rem] flex flex-col gap-6 w-full border bg-white rounded-2xl border-[#DCDCDC] px-[1.5rem] sm:px-[4rem] py-[2rem] text-center">
        <div className="max-w-[327px] mx-auto text-[#586166] mt-[1rem] text-center">
          A verification code has been sent to your email <span className="text-blue">{user.email}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-6" disabled={validateEmailMutation.isPending}>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={otp}
              onChange={handleChangeOtp}
            >
              <InputOTPGroup>
                {Array.from({ length: 4 }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <div className="text-[#586166]">
              {canResend ? (
                <div className="text-[#586166] flex items-center justify-center space-x-1">
                  <span>Didn't receive code?</span>
                  <button
                    type="button"
                    className="text-[#80D0E3]"
                    onClick={handleSendOtp}
                    disabled={sendOtpMutation.isPending}
                  >
                    {sendOtpMutation.isPending ? "Sending..." : "Resend code"}
                  </button>
                </div>
              ) : (
                <span className="text-[#8A8A8A]">Resend code in {timer}s</span>
              )}
            </div>
            <Button variant="default" className="mt-[.5rem]" type="submit">
              {validateEmailMutation.isPending ? <CirculaLoader /> : "Verify"}
            </Button>
            <ChangeEmailDialog />
          </fieldset>
        </form>
        <Separator />
        <div className="text-[#8A8A8A] text-[12px] leading-[22.4px] max-w-[370px]">
          Protected by reCAPTCHA and subject to the Rhombus{" "}
          <a className="text-[#80D0E3]" href="">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a className="text-[#80D0E3]" href="">
            Terms of Service
          </a>
          .
        </div>
      </section>
    </main>
  );
};

export default Verification;