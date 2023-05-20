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
var lapTotalDuration;



function evaluate(input, output) {    
   // Trigger lap once
   //$.put("/Activity/Trigger", 0);
}
 
function onExerciseStart(input, output) {
  // Initializing Variables
  output.currentLap = 1;
  output.fastLap = null;
  output.fastLapDuration = null;
  output.FirstSector = null;
  output.SecondSector = null;
  output.ThirdSector = null;
  output.FourthSector = null;
}

function onLap(input, output) { 
  if (output.currentLap == 1) {
    output.fastLapDuration = input.Duration;
    output.fastLap = output.currentLap;
    output.currentLap = output.currentLap + 1;
  }else {
  // Check Time each sector
    if (input.Duration < output.fastLapDuration) {
      output.fastLapDuration = input.Duration;
      output.fastLap = output.currentLap;
    }
    output.currentLap = output.currentLap + 1; 
  }    
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
