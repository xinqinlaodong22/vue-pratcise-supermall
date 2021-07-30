import { debounce } from "@/common/utils"
import BackTop from "@/components/content/backTop/BackTop";
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 500);
        this.itemImgListener = () => {
            refresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImgListener);

    }
}

export const backTopMixin = {
    data() {
        return {
            isbacktop: false,
        }
    },

    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        }
    },

    components: {
        BackTop,
    }

}