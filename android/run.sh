#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.AustinHJones.Thundr/host.exp.exponent.MainActivity
