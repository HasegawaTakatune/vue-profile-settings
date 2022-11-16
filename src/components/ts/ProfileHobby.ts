import swal from 'sweetalert2';
import BaseAction from "./BaseAction";

export default class ProfileHobby extends BaseAction {
    public async action(form: Array<any>): Promise<any> {
        const inputOptions = {
            'インドア': {
                book: '読書',
                cooking: '料理',
                movie: '映画鑑賞',
                anima: 'アニメ鑑賞',
            },
            'アウトドア': {
                walking: 'ウォーキング',
                running: 'ランニング',
                cycling: 'サイクリング',
                drive: 'ドライブ',
                camp: 'キャンプ',
                climbing: '登山',
            },
            secret: '秘密',
        }

        await swal.fire({
            input: 'select',
            inputOptions: inputOptions,
            inputLabel: '趣味',
            inputValue: '',
        }).then(result => {
            form.push({ id: 'setting-hobby', label: '趣味', value: result.value });
        });

        return form;
    }
}