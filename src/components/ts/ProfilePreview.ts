import swal from 'sweetalert2';
import BaseAction from "./BaseAction";

export default class ProfileBirthday extends BaseAction {

    public async action(form: Array<any>): Promise<any> {
        let text = '';
        for (let i = 0; i < form.length; i++) {
            const fm = form[i];
            switch (fm.id) {
                case 'setting-self-introduction':
                    text += `<div><strong> ${fm.label}</strong></div><div style='white-space: pre-wrap; text-align: left; margin: 0 50px 20px 50px; border: solid #d4d4d4; border-block-style: none;'>${fm.value}</div>`
                    break;
                case 'setting-gender':
                    const gender = this.convertGender(fm.value);
                    text += `<div><strong> ${fm.label}</strong></div><div style='margin: 0 50px 20px 50px; border: solid #d4d4d4; border-block-style: none;'>${gender}</div>`
                    break;
                case 'setting-hobby':
                    const hobby = this.convertHobby(fm.value);
                    text += `<div><strong> ${fm.label}</strong></div><div style='margin: 0 50px 20px 50px; border: solid #d4d4d4; border-block-style: none;'>${hobby}</div>`
                    break;
                default:
                    text += `<div><strong> ${fm.label}</strong></div><div style='margin: 0 50px 20px 50px; border: solid #d4d4d4; border-block-style: none;'>${fm.value}</div>`
                    break;
            }

        }

        await swal.fire({ title: 'プレビュー', html: text, });

        return form;
    }

    private convertGender = (gender: string): string => {
        switch (gender) {
            case 'man': return '男性';
            case 'woman': return '女性';
            case 'other': return 'その他';
            default: return '';
        }
    }

    private convertHobby = (hobby: string): string => {
        switch (hobby) {
            case 'book': return '読書';
            case 'cooking': return '料理';
            case 'movie': return '映画鑑賞';
            case 'anima': return 'アニメ鑑賞';
            case 'walking': return 'ウォーキング';
            case 'running': return 'ランニング';
            case 'cycling': return 'サイクリング';
            case 'drive': return 'ドライブ';
            case 'camp': return 'キャンプ';
            case 'climbing': return '登山';
            case 'secret': return '秘密';
            default: return '';
        }
    }
}