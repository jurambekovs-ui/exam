import Movie from '../schemas/movies.schema.js';
import { ApiError } from '../utils/movie-custom.error.js';
import { errorRes } from '../utils/error-response.js';
import { movieRes } from '../utils/movie-response.js';

class MovieController {
    async create(req, res) {
        try {
            const { title } = req.body;
            const existingMovie = await Movie.findOne({ title });
            if (existingMovie) {
                throw new ApiError('Movie with this title already exists', 409);
            }
            const newMovie = await Movie.create(req.body);
            return movieRes(res, newMovie, 201);
        } catch (error) {
            return errorRes(res, error);
        }
    }

    async findAll(req, res) {
        try {
            const movies = await Movie.find();
            return movieRes(res, movies);
        } catch (error) {
            return errorRes(res, error);
        }
    }

    async findOne(req, res) {
        try {
            const movie = await Movie.findById(req.params.id);
            if (!movie) {
                throw new ApiError('Movie not found', 404);
            }
            return movieRes(res, movie);
        } catch (error) {
            return errorRes(res, error);
        }
    }

    async update(req, res) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedMovie) {
                throw new ApiError('Movie not found', 404);
            }
            return movieRes(res, updatedMovie);
        } catch (error) {
            return errorRes(res, error);
        }
    }

    async remove(req, res) {
        try {
            const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
            if (!deletedMovie) {
                throw new ApiError('Movie not found', 404);
            }
            return movieRes(res, { message: 'Movie successfully deleted' });
        } catch (error) {
            return errorRes(res, error);
        }
    }
}

export default new MovieController();
