"use client";

import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Scanner() {
  const [activeCamera, setActiveCamera] = useState<string>("");
  const [currentTextInput, setTextInput] = useState<string>("");
  const router = useRouter();
  let html5QrCode: any;
  let qrcodeId = "qr-code-scanner";

  function handleCodeInput(code: string) {
    console.log(code);
    router.push(`/product/${code}`);
  }

  useEffect(() => {
    // // Anything in here is fired on component mount.
    // if (!html5QrCode?.getState()) {
    //   html5QrCode = new Html5Qrcode(qrcodeId);
    //   const qrCodeSuccessCallback = (
    //     decodedText: string,
    //     decodedResult: string
    //   ) => {
    //     /* handle success */
    //     console.log(`QR Code detected: ${decodedText}`);
    //     handleCodeInput(decodedText);
    //   };
    //   const config = {
    //     fps: 100,
    //     qrbox: { width: 250, height: 250 },
    //     focusMode: "continuous",
    //     experimentalFeatures: {
    //       useBarCodeDetectorIfSupported: true,
    //     },
    //     aspectRatio: 1,
    //   };

    //   // If you want to prefer back camera
    //   html5QrCode.start(
    //     { facingMode: "environment" },
    //     config,
    //     qrCodeSuccessCallback
    //   );
    // }

    let html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeId,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(handleCodeInput, () => console.log("fail"));

    return () => {
      // Anything in here is fired on component unmount.
    };
  }, [handleCodeInput]);

  return (
    <>
      <div id={qrcodeId} className="aspect-square w-full" />
      <div>
        <Label>Not working?</Label>
        <div className="flex w-full items-center gap-2">
          <Input
            type="number"
            autoFocus={false}
            value={currentTextInput}
            onChange={(e) => setTextInput(e.target.value)}
            maxLength={15}
            inputMode="numeric"
          />
          <DialogClose>
            <Button onClick={() => handleCodeInput(currentTextInput)}>
              Go
            </Button>
          </DialogClose>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Input the EAN code on the reverse of the item to quickly locate it.
        </p>
      </div>
    </>
  );
}
