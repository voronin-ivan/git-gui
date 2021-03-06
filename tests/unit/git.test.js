const { expect } = require('chai');
const {
    getBranches,
    getCommits,
    getFiles,
    getBreadCrumbs,
    getFileContent
} = require('../../server/core/git');

describe('Функция getBranches', () => {
    it('Должна возвращать список всех веток в репозитории', async () => {
        const exec = (cmd) => {
            if (cmd === 'git branch') {
                return ' * master\nbranch0\nbranch1 ';
            }
        };
        const actual = await getBranches(exec);
        const expected = ['master', 'branch0', 'branch1']

        expect(actual).to.deep.equal(expected);
    });
});

describe('Функция getCommits', () => {
    it('Должна возвращать список всех коммитов в выбранной ветке', async () => {
        const exec = (cmd) => {
            if (cmd === 'git log --pretty=format:"%h|%ad|%an|%s" --date=short master') {
                return 'a6ba706|2018-03-23|nage|some info about commit';
            }
        };
        const actual = await getCommits('master', exec);
        const expected = [{
            hash: 'a6ba706',
            date: '2018-03-23',
            autor: 'nage',
            message: 'some info about commit'
        }];

        expect(actual).to.deep.equal(expected);
    });
});

describe('Функция getFiles', () => {
    it('Должна возвращать список файлов в выбранной ветке/коммите', async () => {
        const exec = (cmd) => {
            if (cmd === 'git ls-tree master') {
                return '100644 blob 00bcb6e3738c7392875d6c3e65c22d569eaff069\tREADME.md';
            }
        };
        const actual = await getFiles('master', exec);
        const expected = [{ type: 'blob', hash: '00bcb6', name: 'README.md' }];

        expect(actual).to.deep.equal(expected);
    });
});

describe('Функция getBreadCrumbs', () => {
    it('Должна возвращать путь (список с именами и хэшами) до выбранного файла/папки', async () => {
        const exec = (cmd) => {
            if (cmd === 'git ls-tree -t -r master') {
                return `100644 blob 00bcb6e3738c7392875d6c3e65c22d569eaff069\tREADME.md\n040000 tree b9deb05704bdaa25dac50c6dbedebbf8dfd6029b\timg\n100644 blob f74c51327ab46aa798d2c44e9c85baefa717d622\timg/fire.png`
            }
        };
        const actual = await getBreadCrumbs('master', 'f74c51', exec);
        const expected = [
            { name: 'img', hash: 'b9deb0' },
            { name: 'fire.png', hash: 'f74c51' }
        ];

        expect(actual).to.deep.equal(expected);
    });
});

describe('Функция getFileContent', () => {
    it('Должна вернуть тип файла "simple" и содержимое плоского файла', async () => {
        const fileHash = '94aca0'; // file main.js from branch 'epic-branch'
        const content = 'console.log(\'epic\');';
        const exec = (cmd) => {
            if (cmd === `git rev-list --objects --all | grep ${fileHash}`) {
                return `${fileHash} main.js`;
            }

            if (cmd === `git show ${fileHash}`) return content;
        };
        const actual = await getFileContent(fileHash, exec);
        const expected = {
            type: 'simple',
            content
        };

        expect(actual).to.deep.equal(expected);
    });

    it('Должна вернуть тип файла "image", если у файла расширение .png', async () => {
        const fileHash = 'b62cf2'; // file door.png from branch 'task-image'
        const exec = (cmd) => {
            if (cmd === `git rev-list --objects --all | grep ${fileHash}`) {
                return `${fileHash} door.png`;
            }
        };
        const actual = await getFileContent(fileHash, exec);
        const expected = { type: 'image' };

        expect(actual).to.deep.equal(expected);
    });
});
