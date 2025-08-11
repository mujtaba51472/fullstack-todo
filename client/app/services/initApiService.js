// app/initApiService.js
"use client";

import { useEffect } from "react";
import ApiService from "./apiservice";

export default function InitApiService() {
  useEffect(() => {
    ApiService.init();
  }, []);

  return null; 
}
