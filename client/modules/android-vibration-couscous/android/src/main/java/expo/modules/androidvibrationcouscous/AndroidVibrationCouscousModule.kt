package expo.modules.androidvibrationcouscous

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.os.VibrationEffect
import android.os.Vibrator

class AndroidVibrationCouscousModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('AndroidVibrationCouscous')` in JavaScript.
    Name("AndroidVibrationCouscous")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("vibrate") { (vibrationPattern: LongArray) ->
      val vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
      if(vibrator.hasVibrator()){
        val vibrationEffect = VibrationEffect.createWaveform(pattern, -1)
        vibrator.vibrate(vibrationEffect)
      }
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(AndroidVibrationCouscousView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: AndroidVibrationCouscousView, prop: String ->
        println(prop)
      }
    }
  }
}
