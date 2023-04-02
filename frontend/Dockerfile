FROM nginx:1.23.4-alpine-slim
# Copy built assets from builder
COPY build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3080
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
