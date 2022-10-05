import {Button} from 'vant';
import { Swipe, SwipeItem } from 'vant';
import {Image} from "vant";
import {Uploader} from "vant";
import { Sidebar, SidebarItem } from 'vant';
import { ConfigProvider } from 'vant';
import { Toast } from 'vant';

export function vant(app) {
    app.use(Button)
    app.use(ConfigProvider);
    app.use(Swipe)
    app.use(SwipeItem)
    app.use(Image)
    app.use(Uploader)
    app.use(Sidebar)
    app.use(SidebarItem)
    app.use(Toast)
}

