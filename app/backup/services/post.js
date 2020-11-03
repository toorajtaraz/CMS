const { Backup } = require('../../../core/models/backup');

const addToBackupQ = async (id, data) => {
    const backup = await Backup.create({
        owner: id,
        is_full: data.is_full,
        collections: (data.is_full) ? null : data.collections,
    });
    return  backup;
};

module.exports = {
    addToBackupQ,
};

