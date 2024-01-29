import {
  Bouton,
  ComputedList,
  Div,
  For,
  NoeudModel,
  Text,
} from "nirina.js";

let counterValue = 0;
const reactiveValue = new ComputedList<NoeudModel>([Div().addId('counter-0').addChild(Text(`Counter is ${counterValue}`)).build()]);


export const CounterBouton = Div()
  .addChild(
    Bouton()
      .setText("Incrémenter")
      .setOnClick(
        () =>
          (reactiveValue.value.state = [
            Div().addId(`counter-${++counterValue}`).addChild(Text(`Counter is ${counterValue}`)).build(),
          ]),
      ),
  )
  .addChild(For(reactiveValue));
