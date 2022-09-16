import  mongoose  from "mongoose";
import Mezmur from "../models/mezmurs.js";

// export const getMezmurs = async (req, res, next) => {
//   try {
//     const mezmurs = await Mezmur.find(req.query);
//     res.status(200).send(mezmurs);
//   } catch (err) {
//     next(err);
//   }
// };

export const getMezmurs = async (req, res) => {
  try {
    const mezmur = await Mezmur.find();
    res.status(200).json(mezmur);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const addMezmur = async (req, res) => {
  const mezmur = req.body;

  const newMezmur = new Mezmur({
    ...mezmur,
    createdBy: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newMezmur.save();
    res.status(201).json(newMezmur);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


// export const addMezmur = async (req, res, next) => {
//   try {
//     const newMezmur = new Mezmur(req.body);
//     await newMezmur.save();
//     res.status(201).send(newMezmur);
//   } catch (err) {
//     next(err);
//   }
// };

export const getSingleMezmur = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No mezmur id with this id!");
    }
    const mezmur = await Mezmur.findById(_id);
        if (!mezmur) return res.json({ message: "No mezmur with this id" });
        res.status(200).send(mezmur);
  }catch (err){
    next(err)
  }
};

//delete
//findByIdAndRemove(id)
export const deleteMezmur = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No mezmur id with this id!");
    }

    await Mezmur.findByIdAndRemove(_id);

    res.status(201).json({ message: "Mezmur deleted!" });
  } catch (error) {
    res.status(409).json({ message: error });
  }
};


// export const deleteMezmur = async (req, res, next) => {
//   try {
//       const { id } = req.params;
     
//       const deleted = await Mezmur.findByIdAndRemove(id);
    
//       if (!deleted) throw new createError.NotFound();
//       res.status(204).send();
//   } catch (err) {
//       next(err);
//   }
// };

// export const updateRecord = async (req, res, next) => {
//   try {
//       const { id } = req.params;
//       const updated = await Record.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
//       if (!updated) throw new createError.NotFound();
//       res.status(200).send(updated);
//   } catch (err) {
//       next(err);
//   }
// };

export const updateMezmur = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const mezmur = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post id with this id!");
    }

    const updatedMezmur = await Mezmur.findByIdAndUpdate(
      _id,
      { ...mezmur, _id },
      { new: true }
    );

    res.status(201).json(updatedMezmur);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
