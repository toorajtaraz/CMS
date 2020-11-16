const { Backup } = require('../../../core/models/backup');

const addToBackupQ = async (id, data) => {
    const collections = [];
    if (!data.is_full) {
        for (let i = 0; i < data.collections.length; i += 1) {
            collections.push(data.collections[i].name);
        }
    }
    const backup = await Backup.create({
        owner: id,
        is_full: data.is_full,
        collections: (data.is_full) ? null : collections,
    });
    return  backup;
};

module.exports = {
    addToBackupQ,
};

