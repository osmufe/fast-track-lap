/*
 function onLap() { trace('--- onLap ---'); }
 function onAutoLap() { trace('--- onAutoLap ---'); }
 function onInterval() { trace('--- onInterval ---'); }
 function onPoolLength() { trace('--- onPoolLength ---'); }
 function onExerciseStart() { trace('--- onExerciseStart ---'); }
 function onExercisePause() { trace('--- onExercisePause ---'); }
 function onExerciseContinue() { trace('--- onExerciseContinue ---'); }
 function onExerciseEnd() { trace('--- onExerciseEnd ---'); }
 function onExercisePause() { trace('--- onExerciseEnd ---'); }
 function onExerciseContinue() { trace('--- onExerciseEnd ---'); }
 */
var FirstSectorLap, SecondSectorLap, ThirdSectorLap, FourthSectorLap, LastLapDistance;

function evaluate(input) {
   if (((input.Distance - LastLapDistance) >= 99)&&((input.Distance - LastLapDistance)< 104)){
     FirstSectorLap = input.CurrentDuration;
   }else if (((input.Distance - LastLapDistance)>= 199)&&((input.Distance - LastLapDistance)< 204)){
     SecondSectorLap = input.CurrentDuration - FirstSectorLap;
   }else if (((input.Distance - LastLapDistance)>= 299)&&((input.Distance - LastLapDistance)< 304)){
     ThirdSectorLap = input.CurrentDuration - (FirstSectorLap + SecondSectorLap ) ;
   }else if (((input.Distance - LastLapDistance)>= 399)&&((input.Distance - LastLapDistance)< 404)){
     FourthSectorLap = input.CurrentDuration - (FirstSectorLap + SecondSectorLap + ThirdSectorLap);
     // Trigger lap once
     LastLapDistance = input.Distance;
     $.put("/Activity/Trigger", 0);
   }
}
 
function onExerciseStart(input, output) {
  // Initializing Variables
  output.currentLap = 1;
  LastLapDistance = 0;
  output.fastLap = null;
  output.fastLapDuration = null;
  output.FirstSector = null;
  output.SecondSector = null;
  output.ThirdSector = null;
  output.FourthSector = null;
  FirstSectorLap = null;
  SecondSectorLap = null;
  ThirdSectorLap = null;
  FourthSectorLap = null;
}

function onLap(input, output) {
  if (output.currentLap == 1) {
    output.fastLapDuration = input.PreviousDuration;
    output.fastLap = output.currentLap;
    output.FirstSector = FirstSectorLap;
    output.SecondSector = SecondSectorLap;
    output.ThirdSector = ThirdSectorLap;
    output.FourthSector = FourthSectorLap;
  }else {
    if (input.PreviousDuration < output.fastLapDuration) {
      output.fastLapDuration = input.PreviousDuration;
      output.fastLap = output.currentLap;
    }
    if (FirstSectorLap < output.FirstSector) {
      output.FirstSector = FirstSectorLap;
    }
    if (SecondSectorLap < output.SecondSector){
      output.SecondSector = SecondSectorLap;
    }
    if (ThirdSectorLap < output.ThirdSector){
      output.ThirdSector = ThirdSectorLap;
    }
    if (FourthSectorLap < output.FourthSector){
      output.FourthSector = FourthSectorLap;
    }
  }
  output.currentLap = output.currentLap + 1;
  FirstSectorLap = null;
  SecondSectorLap = null;
  ThirdSectorLap = null;
  FourthSectorLap = null;
}
 
 function getUserInterface(input, output) {
   return {
    template: 't'
   };
 }
 
 // This is called also when user backs from exercise start panel without starting
 // exercise. onExerciseEnd() is not working at all as zapp gets disabled before
 // it is called (and it would be called only when exercise is really started).
 function getSummaryOutputs(input, output) {
   return [
     {

     },
   ];
 }