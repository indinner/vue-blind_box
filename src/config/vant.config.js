import {Button} from 'vant';
import { Popup } from 'vant';
import { Tag } from 'vant';
import { Icon } from 'vant';
import { Field, CellGroup } from 'vant'
import { Uploader } from 'vant';
import { Image as VanImage } from 'vant';
import { Notify } from 'vant';
import { Stepper } from 'vant';
import { Lazyload } from 'vant';
import { Loading } from 'vant';
import 'vant/lib/index.css';

export function vant(app) {
    app.use(Button)
    app.use(Popup)
    app.use(Tag)
    app.use(Icon)
    app.use(Field);
    app.use(CellGroup);
    app.use(Uploader)
    app.use(VanImage)
    app.use(Stepper);
    app.use(Lazyload)
    app.use(Loading)
    app.use(Notify)
}

